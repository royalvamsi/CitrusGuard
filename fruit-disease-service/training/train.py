
import os
import json
import torch
import torch.optim as optim
import random
import numpy as np

from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

from models.resnet_model import FruitResNet
from data.dataloader import get_dataloaders
from data.transforms import TransformFactory
from training.trainer import Trainer
from training.evaluate import evaluate
from training.utils.class_weights import compute_class_weights


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

EPOCHS = 40
LR = 0.0003


def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)


set_seed()


def main():

    # -------------------- Data --------------------
    train_loader, val_loader = get_dataloaders(
        "data/dataset/train",
        "data/dataset/val"
    )

    print(f"Found {len(train_loader.dataset)} training images")
    print(f"Found {len(val_loader.dataset)} validation images")

    # -------------------- Test Data --------------------
    test_dataset = ImageFolder(
        root="data/dataset/test",
        transform=TransformFactory.validation()
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=32,
        shuffle=False,
        num_workers=0
    )

    print(f"Found {len(test_loader.dataset)} test images")

    train_dataset = train_loader.dataset

    class_weights = compute_class_weights(train_dataset)

    # -------------------- Class Mapping --------------------
    class_to_idx = train_dataset.class_to_idx
    num_classes = len(train_dataset.classes)

    os.makedirs("artifacts", exist_ok=True)

    with open("artifacts/class_mapping.json", "w") as f:
        json.dump(class_to_idx, f, indent=4)

    print("\nClass mapping:", class_to_idx)

    # -------------------- Model --------------------
    model = FruitResNet(num_classes).to(DEVICE)

    optimizer = optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=LR
    )

    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode='max',
        factor=0.3,
        patience=3
    )

    # -------------------- Trainer --------------------
    trainer = Trainer(
        model=model,
        train_loader=train_loader,
        val_loader=val_loader,
        device=DEVICE,
        class_weights=class_weights,
        optimizer=optimizer
    )

    # -------------------- Training --------------------
    print("\n🚀 Training Started...\n")

    best_acc = 0

    for epoch in range(EPOCHS):

        loss = trainer.train_epoch()
        acc, cm, per_class_acc, per_class_precision = evaluate(model, val_loader, DEVICE)

        scheduler.step(acc)

        print(f"\nEpoch {epoch+1}/{EPOCHS}")
        print(f"Loss: {loss:.4f}")
        print(f"Validation Accuracy: {acc:.4f}")

        if acc > best_acc:
            best_acc = acc
            torch.save({
                "model_state": model.state_dict(),
                "class_mapping": class_to_idx,
                "accuracy": acc,
                "epoch": epoch
            }, "artifacts/best_model.pt")

    print("\n🔥 Training Complete. Model Saved.")

    # -------------------- Test Evaluation --------------------
    print("\n📊 Evaluating on Test Data...\n")

    test_acc, cm, per_class_acc, per_class_precision = evaluate(model, test_loader, DEVICE)

    print(f"\nTest Accuracy: {test_acc:.4f}")
    print("\nConfusion Matrix:\n", cm)


if __name__ == "__main__":
    main()
    