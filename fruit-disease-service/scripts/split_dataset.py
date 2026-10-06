print("HELLO  SCRIPT STARTED")
import os
import shutil
import random


def split_dataset(
    source_dir,
    output_dir,
    train_ratio=0.8,
    val_ratio=0.1,
    test_ratio=0.1,
    seed=42
):

    random.seed(seed)

    assert train_ratio + val_ratio + test_ratio == 1.0

    for split in ["train", "val", "test"]:
        os.makedirs(os.path.join(output_dir, split), exist_ok=True)

    for class_name in os.listdir(source_dir):

        print("Processing:", class_name)  # ✅ progress print

        class_path = os.path.join(source_dir, class_name)

        if not os.path.isdir(class_path):
            continue

        images = os.listdir(class_path)
        random.shuffle(images)

        total = len(images)

        train_end = int(total * train_ratio)
        val_end = train_end + int(total * val_ratio)

        train_files = images[:train_end]
        val_files = images[train_end:val_end]
        test_files = images[val_end:]

        for split in ["train", "val", "test"]:
            os.makedirs(os.path.join(output_dir, split, class_name), exist_ok=True)

        def copy_files(file_list, split):
            for i, file in enumerate(file_list):
                src = os.path.join(class_path, file)
                dst = os.path.join(output_dir, split, class_name, file)
                shutil.copy(src, dst)  # faster

                if i % 50 == 0:
                    print(f"{class_name} [{split}] → {i}/{len(file_list)}")

        copy_files(train_files, "train")
        copy_files(val_files, "val")
        copy_files(test_files, "test")

        print(f"✅ {class_name}: {total} images split")

    print("🎉 Dataset split complete.")


if __name__ == "__main__":

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    SOURCE_DIR = os.path.join(BASE_DIR, "data", "dataset", "raw_dataset")
    OUTPUT_DIR = os.path.join(BASE_DIR, "data", "dataset")

    print("Script started")
    print("Current working directory:", os.getcwd())
    print("Source exists:", os.path.exists(SOURCE_DIR))

    if os.path.exists(SOURCE_DIR):
        print("Source contents:", os.listdir(SOURCE_DIR))
    else:
        print("❌ SOURCE FOLDER NOT FOUND")

    split_dataset(SOURCE_DIR, OUTPUT_DIR)