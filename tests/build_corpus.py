#!/usr/bin/env python3
"""Origami oracle: independent python recompute of paper sizing and cutting."""
import json, os

MODELS = {
 'crane': 0.42, 'frog': 0.35, 'boat': 0.40, 'box': 0.25, 'lily': 0.38,
 'dart': 0.62, 'butterfly': 0.45, 'helmet': 0.40, 'balloon': 0.30, 'star': 0.05,
}
STD = [7.5,10,15,20,25,30,35]
SHEETS = {'a4':(21.0,29.7),'a3':(29.7,42.0),'a5':(14.8,21.0),
          'letter':(21.6,27.9),'legal':(21.6,35.6)}

def paper_for(mid, target):
    if mid not in MODELS or not target > 0: return None
    side = target / MODELS[mid]
    std = next((s for s in STD if s >= side), None)
    return {'sideCm': round(side,1), 'suggest': std}

def cut_square(w,h):
    if not w > 0 or not h > 0: return None
    side = min(w,h); rest = abs(w-h)
    left = []
    if rest > 0:
        if w > h: left.append({'w': round(rest,1), 'h': h})
        else: left.append({'w': w, 'h': round(rest,1)})
    return {'side': round(side,1), 'leftover': left}

items = []
for mid, t in [('crane',10),('crane',21),('box',5),('dart',18),('frog',7),
               ('lily',12),('star',1.2),('nope',5),('boat',0),('helmet',16)]:
    items.append({'kind':'paper','model':mid,'target':t,'oracle':paper_for(mid,t)})
for w,h in [(21,29.7),(29.7,42),(21.6,27.9),(15,15),(10,0),(50,20)]:
    items.append({'kind':'cut','w':w,'h':h,'oracle':cut_square(w,h)})
for sid in SHEETS:
    w,h = SHEETS[sid]
    items.append({'kind':'sheet','id':sid,'oracle':cut_square(w,h)})
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'expected.json')
json.dump({'items': items}, open(out,'w'))
print('cases:', len(items))
