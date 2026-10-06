import torch
import json
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from models.resnet_model import FruitResNet
from data.transforms import TransformFactory
from training.evaluate import evaluate

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def main():
    # Load class mapping
    with open("artifacts/class_mapping.json", "r") as f:
        class_to_idx = json.load(f)

    num_classes = len(class_to_idx)

    # Load model
    model = FruitResNet(num_classes).to(DEVICE)
    checkpoint = torch.load("artifacts/best_model.pt", map_location=DEVICE)
    model.load_state_dict(checkpoint["model_state"])

    # Load test data
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

    print(f"Evaluating on {len(test_loader.dataset)} test images")

    # Evaluate
    test_acc, cm, per_class_acc, per_class_precision = evaluate(model, test_loader, DEVICE)

    print(f"\nTest Accuracy: {test_acc:.4f}")
    print("\nConfusion Matrix:")
    print(cm)
    print("\nPer-Class Accuracy:")
    for class_name, acc in per_class_acc.items():
        print(f"{class_name}: {acc:.4f}")
    print("\nPer-Class Precision:")
    for class_name, prec in per_class_precision.items():
        print(f"{class_name}: {prec:.4f}")

if __name__ == "__main__":
    main()