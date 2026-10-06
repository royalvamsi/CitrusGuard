from torchvision.datasets import ImageFolder
from data.transforms import TransformFactory


def get_datasets(train_dir: str, val_dir: str):

    train_dataset = ImageFolder(
        root=train_dir,
        transform=TransformFactory.train()
    )

    val_dataset = ImageFolder(
        root=val_dir,
        transform=TransformFactory.validation()
    )
    
    print("Class mapping:", train_dataset.class_to_idx)

    return train_dataset, val_dataset