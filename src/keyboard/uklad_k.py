#!/usr/bin/env python3
#
# UKLAD Keyboard
#

import keyboard as k


ms = [
    ("//", "/"),
    
    ("/G", "Ğ"), ("/g", "ğ"),
    
    ("/I", "Į"), ("/i", "į"),
    
    ("/C", "Č"), ("/c", "č"),
    ("/S", "Š"), ("/s", "š"),
    ("/Z", "Ž"), ("/z", "ž"),
    ("/Sc", "Šč"), ("/sc", "šč"),
    
    ("''", "'"),
    
    ("C'", "Ć"), ("c'", "ć"),
    ("D'", "Ď"), ("d'", "ď"),
    ("L'", "Ľ"), ("l'", "ľ"),
    ("N'", "Ń"), ("n'", "ń"),
    ("S'", "Ś"), ("s'", "ś"),
    ("T'", "Ť"), ("t'", "ť"),
    ("Z'", "Ź"), ("z'", "ź"),
]


try:
    for m in ms:
        k.add_abbreviation(m[0], m[1], match_suffix=True)
    k.wait()

except KeyboardInterrupt:
    pass
