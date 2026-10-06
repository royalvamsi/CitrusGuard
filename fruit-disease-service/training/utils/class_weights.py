import torch
from collections import Counter

def compute_class_weights(dataset):
    targets = dataset.targets
    class_counts = Counter(targets)

    total = sum(class_counts.values())
    num_classes = len(class_counts)

    weights = []

    for i in range(num_classes):
        count = class_counts[i]
        weight = total / (num_classes * count)
        weights.append(weight)

    return torch.tensor(weights, dtype=torch.float)