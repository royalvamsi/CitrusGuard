
import torch
import numpy as np
from sklearn.metrics import classification_report


def evaluate(model, dataloader, device):

    model.eval()

    correct = 0
    total = 0

    all_preds = []
    all_labels = []

    with torch.no_grad():
        for images, labels in dataloader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)
            _, preds = torch.max(outputs, 1)

            correct += (preds == labels).sum().item()
            total += labels.size(0)

            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())

    # -------------------- Accuracy --------------------
    accuracy = correct / total if total > 0 else 0

    # -------------------- Confusion Matrix --------------------
    num_classes = len(dataloader.dataset.classes)
    cm = np.zeros((num_classes, num_classes), dtype=int)

    for t, p in zip(all_labels, all_preds):
        cm[t][p] += 1

    class_names = dataloader.dataset.classes

    # -------------------- Per-Class Metrics --------------------
    per_class_acc = {}
    per_class_precision = {}

    for i in range(num_classes):
        row_sum = cm[i].sum()
        col_sum = cm[:, i].sum()

        per_class_acc[class_names[i]] = cm[i][i] / row_sum if row_sum > 0 else 0
        per_class_precision[class_names[i]] = cm[i][i] / col_sum if col_sum > 0 else 0

    # -------------------- Classification Report --------------------
    print("\n📊 Classification Report:\n")
    print(classification_report(all_labels, all_preds, target_names=class_names))

    return accuracy, cm, per_class_acc, per_class_precision

