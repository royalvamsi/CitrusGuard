import io
from PIL import Image
from torchvision import transforms
from torchvision.transforms import InterpolationMode


transform = transforms.Compose([
    transforms.Resize(256, interpolation=InterpolationMode.BILINEAR),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def preprocess_image(image_bytes: bytes):

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    tensor = transform(image)

    tensor = tensor.unsqueeze(0)

    return tensor