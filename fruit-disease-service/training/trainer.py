import torch
import torch.nn as nn


class Trainer:
    def __init__(self, model, train_loader, val_loader, device, class_weights, optimizer):
        self.model = model
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.device = device
        self.optimizer = optimizer

        self.criterion = nn.CrossEntropyLoss(
            weight=class_weights.to(device),
            label_smoothing=0.1
        )
        
    def train_epoch(self):
        self.model.train()
        total_loss = 0
    
        for images, labels in self.train_loader:
            images = images.to(self.device)
            labels = labels.to(self.device)
    
            self.optimizer.zero_grad()
    
            outputs = self.model(images)
            loss = self.criterion(outputs, labels)
    
            loss.backward()
            self.optimizer.step()
    
            total_loss += loss.item()
    
        return total_loss / len(self.train_loader)

    def validate(self):
        self.model.eval()
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in self.val_loader:
                images = images.to(self.device)
                labels = labels.to(self.device)

                outputs = self.model(images)
                _, preds = torch.max(outputs, 1)

                correct += (preds == labels).sum().item()
                total += labels.size(0)

        return correct / total