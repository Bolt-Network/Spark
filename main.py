import json
import os
from pathlib import Path

def clean_unused_images(json_file_path, images_folder_path):
    """
    Delete images from the folder that are not referenced in the JSON file.
    
    Args:
        json_file_path: Path to the JSON file containing game data
        images_folder_path: Path to the folder containing game images
    """
    
    # Read the JSON file
    try:
        with open(json_file_path, 'r') as f:
            games_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: JSON file '{json_file_path}' not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file '{json_file_path}'.")
        return
    
    # Extract all image filenames from the JSON
    used_images = set()
    for game in games_data:
        if 'image' in game and game['image']:
            # Extract just the filename from the path
            image_path = game['image']
            if image_path.startswith('/assets/imgs/games/'):
                filename = image_path.replace('/assets/imgs/games/', '')
                if filename:  # Only add non-empty filenames
                    used_images.add(filename)
    
    print(f"Found {len(used_images)} images referenced in JSON:")
    for img in sorted(used_images):
        print(f"  - {img}")
    
    # Check if the images folder exists
    if not os.path.exists(images_folder_path):
        print(f"\nError: Images folder '{images_folder_path}' not found.")
        return
    
    # Get all image files in the folder
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'}
    all_images = []
    
    for file in os.listdir(images_folder_path):
        if any(file.lower().endswith(ext) for ext in image_extensions):
            all_images.append(file)
    
    print(f"\nFound {len(all_images)} total images in folder.")
    
    # Find unused images
    unused_images = [img for img in all_images if img not in used_images]
    
    if not unused_images:
        print("\nNo unused images found. Nothing to delete.")
        return
    
    print(f"\nFound {len(unused_images)} unused images:")
    for img in sorted(unused_images):
        print(f"  - {img}")
    
    # Confirm before deleting
    response = input("\nDo you want to delete these unused images? (yes/no): ").lower().strip()
    
    if response == 'yes':
        deleted_count = 0
        for img in unused_images:
            try:
                file_path = os.path.join(images_folder_path, img)
                os.remove(file_path)
                print(f"Deleted: {img}")
                deleted_count += 1
            except Exception as e:
                print(f"Error deleting {img}: {e}")
        
        print(f"\nSuccessfully deleted {deleted_count} unused images.")
    else:
        print("\nOperation cancelled. No files were deleted.")

def main():
    # Configure these paths according to your project structure
    json_file_path = "public/assets/json/games.json"  # Update this to your JSON file path
    images_folder_path = "public/assets/imgs/games"  # Update if needed
    
    print("=== Unused Image Cleaner ===\n")
    print(f"JSON file: {json_file_path}")
    print(f"Images folder: {images_folder_path}")
    print()
    
    clean_unused_images(json_file_path, images_folder_path)

if __name__ == "__main__":
    main()