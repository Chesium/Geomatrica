<img src="assets/GeomatricA.svg" width=200>
=

**crd**: abbreviation for *coordinate* — used for computation  
**pos**: abbreviation for *position* — used for display  

**“Drag”** means holding an object with the mouse and moving it. In most cases, it is equivalent to **“move.”**  
**“Move”** means when an object changes position, all related (dependent) objects also change position accordingly.

---

### Steps to Add a New Feature

1. Write a new feature class in the **shape** folder  
2. Create a corresponding **drawingMode**  
3. Add the new drawingMode to **dm.ts**  
4. Register the drawingMode in **Mode**  
5. Add a button in **index.ts**

---

## Geomatrica

**Geomatrica** is a *dynamic geometry software (DGS)* under development, similar to GeoGebra.  
The following features have been implemented or are planned:

---

### Mode 0 – Drag

- [x] Freely drag free points; all their dependent objects update accordingly  
- [x] When dragging a semi-free point on a line or circle, it moves along its path, simulating a moving point (continuously computing the position closest to the cursor)  
- [x] Lines and circles can be dragged, which recursively drags all their parent objects, and their child objects update accordingly  

---

### Mode 1 – Segment

- [x] Click and drag on the canvas to draw a segment  
- [x] Clicking an existing point starts drawing a segment from that point  
- [x] Clicking a line or circle creates a new point on it and starts a segment from there  
- [x] Releasing the mouse on another point connects that point with the initial one  
- [x] Releasing on a line or circle creates a new point on it and connects it with the initial point  

---

### Mode 2 – Point

- [x] Click on empty space to create a free point  
- [x] Click on a line or circle to create a point on it  

---

### Mode 3 – Circle

- [x] Click to set the circle’s centre and drag to define its radius  
- [x] Clicking an existing point starts a circle centred at that point  
- [x] Clicking a line or circle creates a point on it and uses that as the circle’s centre  
- [x] Releasing the mouse on another point draws a circle through that point  
- [x] Releasing on a line or circle creates a point on it and draws a circle through it  

---

### Mode 4 – Line

- [x] Click and drag on the canvas to draw a line  

---

### Mode 5 – Ray

- [x] Click and drag on the canvas to draw a ray  

---

### Mode 6–14

6. Intersection Point  
7. Perpendicular Line  
8. Parallel Line  
9. Extended Line  
10. Angle Bisector  
11. Tangent  
12. Perpendicular Bisector  
13. Midpoint  
14. Circumcircle  

---

### General Behaviours

- [x] When drawing lines or circles, releasing the mouse near a point automatically snaps to that point  
- [x] In line/circle drawing modes, clicking a line or circle near a point uses that point as the start  
- [x] In line/circle drawing modes, clicking a line or circle away from existing points creates a new moving point on it as the start  
- [x] Display hit detection zones for clickable objects (debug feature)
