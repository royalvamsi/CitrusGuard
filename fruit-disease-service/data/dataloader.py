import os
import torch
from torch.utils.data import DataLoader
from data.dataset import get_datasets


def get_dataloaders(train_dir, val_dir, batch_size=32):

    train_dataset, val_dataset = get_datasets(train_dir, val_dir)

    cpu_count = os.cpu_count() or 1
    num_workers = 0
    pin_memory = torch.cuda.is_available()

    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=num_workers,
        pin_memory=pin_memory,
        drop_last=False
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=pin_memory
    )

    return train_loader, val_loader