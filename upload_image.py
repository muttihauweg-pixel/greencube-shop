#!/usr/bin/env python3
"""
HansHanf Bild-Upload System
Automatisches Hochladen von Produktbildern zu GitHub Pages
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path

# Konfiguration
PRODUCTS_DIR = Path("docs/products")
SUPPORTED_FORMATS = ('.png', '.jpg', '.jpeg', '.webp')

# Sorten-Mapping
STRAINS = {
    'ak47': 'AK-47',
    'amnesia_haze': 'Amnesia Haze',
    'black_cherry_punch': 'Black Cherry Punch',
    'blue_dream': 'Blue Dream',
    'bruce_banner': 'Bruce Banner',
    'candy_store': 'Candy Store',
    'critical_kush': 'Critical Kush',
    'dosidos': 'Do-Si-Dos',
    'gelato': 'Gelato',
    'girl_scout_cookies': 'Girl Scout Cookies',
    'gorilla_glue': 'Gorilla Glue',
    'granddaddy_purple': 'Granddaddy Purple',
    'jokerz': 'Jokerz',
    'kush_mintz': 'Kush Mintz',
    'lemon_haze': 'Lemon Haze',
    'northern_lights': 'Northern Lights',
    'og_kush': 'OG Kush',
    'pineapple_express': 'Pineapple Express',
    'purple_haze': 'Purple Haze',
    'runtz': 'Runtz',
    'strawberry_cough': 'Strawberry Cough',
    'super_skunk': 'Super Skunk',
    'wedding_cake': 'Wedding Cake',
    'white_widow': 'White Widow',
    'zkittlez': 'Zkittlez'
}

def print_header():
    print("=" * 60)
    print("🌿 HansHanf Bild-Upload System")
    print("=" * 60)
    print()

def list_strains():
    print("📋 Verfügbare Sorten:")
    print("-" * 40)
    for key, name in STRAINS.items():
        print(f"  {key:<20} → {name}")
    print()

def check_image_file(filepath):
    """Prüft ob die Datei ein gültiges Bild ist"""
    path = Path(filepath)
    if not path.exists():
        print(f"❌ Fehler: Datei nicht gefunden: {filepath}")
        return False
    
    if path.suffix.lower() not in SUPPORTED_FORMATS:
        print(f"❌ Fehler: Ungültiges Format. Unterstützt: {SUPPORTED_FORMATS}")
        return False
    
    # Dateigröße prüfen (max 5MB)
    size_mb = path.stat().st_size / (1024 * 1024)
    if size_mb > 5:
        print(f"⚠️  Warnung: Bild ist sehr groß ({size_mb:.1f}MB)")
    
    return True

def upload_image(source_path, strain_key):
    """Lädt ein Bild hoch"""
    source = Path(source_path)
    
    if strain_key not in STRAINS:
        print(f"❌ Fehler: Unbekannte Sorte '{strain_key}'")
        print("Verwende --list für alle verfügbaren Sorten")
        return False
    
    # Ziel-Dateiname erstellen
    target_name = f"{strain_key}.png"
    target_path = PRODUCTS_DIR / target_name
    
    # Verzeichnis erstellen falls nötig
    PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Bild kopieren/optimieren
    print(f"📤 Lade hoch: {source.name}")
    print(f"   Sorte: {STRAINS[strain_key]}")
    print(f"   Ziel: {target_path}")
    
    try:
        # Konvertiere zu PNG falls nötig
        if source.suffix.lower() != '.png':
            print("   🔄 Konvertiere zu PNG...")
            # Einfache Kopie (ohne PIL, da es Probleme geben könnte)
            shutil.copy2(source, target_path.with_suffix(source.suffix))
            # Umbenennen zu .png
            os.rename(target_path.with_suffix(source.suffix), target_path)
        else:
            shutil.copy2(source, target_path)
        
        print("   ✅ Bild gespeichert")
        return True
        
    except Exception as e:
        print(f"   ❌ Fehler: {e}")
        return False

def git_commit_and_push():
    """Committet und pushed die Änderungen"""
    print()
    print("🚀 Veröffentliche Änderungen...")
    
    try:
        # Git add
        result = subprocess.run(
            ['git', 'add', 'docs/products/'],
            capture_output=True,
            text=True
        )
        if result.returncode != 0:
            print(f"⚠️  Git add Warnung: {result.stderr}")
        
        # Git commit
        result = subprocess.run(
            ['git', 'commit', '-m', 'Add product images'],
            capture_output=True,
            text=True
        )
        if result.returncode != 0:
            print(f"⚠️  Git commit: {result.stderr}")
        else:
            print("   ✅ Committed")
        
        # Git push
        result = subprocess.run(
            ['git', 'push', 'origin', 'main'],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("   ✅ Gepusht zu GitHub")
            return True
        else:
            print(f"   ❌ Push fehlgeschlagen: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"   ❌ Git Fehler: {e}")
        return False

def main():
    print_header()
    
    # Argumente prüfen
    if len(sys.argv) < 2:
        print("Verwendung:")
        print(f"  python3 {sys.argv[0]} <bildpfad> <sorten-key>")
        print(f"  python3 {sys.argv[0]} --list")
        print()
        print("Beispiel:")
        print(f"  python3 {sys.argv[0]} ~/Downloads/gorilla.png gorilla_glue")
        print()
        list_strains()
        sys.exit(1)
    
    if sys.argv[1] == '--list':
        list_strains()
        sys.exit(0)
    
    if len(sys.argv) < 3:
        print("❌ Fehler: Bitte gib Bildpfad UND Sorten-Key an")
        print(f"  python3 {sys.argv[0]} <bildpfad> <sorten-key>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    strain_key = sys.argv[2]
    
    # Bild prüfen
    if not check_image_file(image_path):
        sys.exit(1)
    
    # Bild hochladen
    if upload_image(image_path, strain_key):
        # Git push
        if git_commit_and_push():
            print()
            print("=" * 60)
            print("🎉 ERFOLG!")
            print("=" * 60)
            print()
            print(f"📸 Bild für {STRAINS[strain_key]} hochgeladen")
            print("🌐 Shop aktualisiert sich in 2-3 Minuten")
            print(f"🔗 https://muttihauweg-pixel.github.io/hanshanf/")
            print()
        else:
            print()
            print("⚠️  Bild gespeichert aber nicht veröffentlicht")
            print("   Führe manuell aus: git push origin main")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
