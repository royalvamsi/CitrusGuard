import torch.nn as nn
import torchvision.models as models
from torchvision.models import resnet34, ResNet34_Weights


class FruitResNet(nn.Module):

    def __init__(self, num_classes, freeze_backbone=True, pretrained=False):
        super().__init__()

        weights = ResNet34_Weights.DEFAULT if pretrained else None
        self.model = resnet34(weights=weights)


        if freeze_backbone:
            for param in self.model.parameters():
                param.requires_grad = True  

        in_features = self.model.fc.in_features
        self.model.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(in_features, num_classes)
        )

    def forward(self, x):
        return self.model(x)