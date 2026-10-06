import os
import shutil
import cv2

SOURCE_FOLDER = "/home/guna/Desktop/raw_data/Black_spots"

DESTINATIONS = {
    "1": "healthy",
    "2": "citrus_canker",
    "3": "black_spot",
    "4": "greening"
}

SUPPORTED_EXT = (".jpg", ".jpeg", ".png")

# create destination folders
for folder in DESTINATIONS.values():
    os.makedirs(folder, exist_ok=True)

images = [f for f in os.listdir(SOURCE_FOLDER) if f.lower().endswith(SUPPORTED_EXT)]
images.sort()

last_move = None
index = 0

print("\nKeyboard Controls")
print("------------------")
print("1 = healthy")
print("2 = citrus_canker")
print("3 = black_spot")
print("4 = greening")
print("s = skip image")
print("d = delete image")
print("u = undo last move")
print("q = quit\n")

while index < len(images):

    img_name = images[index]
    img_path = os.path.join(SOURCE_FOLDER, img_name)

    if not os.path.exists(img_path):
        index += 1
        continue

    img = cv2.imread(img_path)

    if img is None:
        print("Skipping unreadable image:", img_name)
        index += 1
        continue
    
    # Resize for display if too large
    max_width = 1000
    max_height = 700

    h, w = img.shape[:2]

    scale = min(max_width / w, max_height / h, 1)

    if scale < 1:
        img = cv2.resize(img, (int(w * scale), int(h * scale)))

    if img is None:
        print("Corrupted image:", img_name)
        index += 1
        continue

    cv2.imshow("Image Sorter", img)

    print(f"\n[{index+1}/{len(images)}] {img_name}")

    key = cv2.waitKey(0) & 0xFF
    key = chr(key)

    if key == "q":
        break

    # move image
    if key in DESTINATIONS:
        dest = DESTINATIONS[key]
        dest_path = os.path.join(dest, img_name)

        shutil.move(img_path, dest_path)
        last_move = (dest_path, img_path)

        print("Moved →", dest)
        index += 1

    # skip image
    elif key == "s":
        print("Skipped")
        index += 1

    # delete image
    elif key == "d":
        os.remove(img_path)
        print("Deleted")
        index += 1

    # undo last move
    elif key == "u" and last_move:
        src, dst = last_move
        if os.path.exists(src):
            shutil.move(src, dst)
            print("Undo successful")
        last_move = None

cv2.destroyAllWindows()
print("\nSorting finished.")