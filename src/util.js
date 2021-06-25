//     y
//     ^
// +-------N
// |*******|
// |*******|  > x
// M-------+

//  00  01   10   11
//[[Xm, Ym],[Xn, Yn]]

export function L_DpData_To_epCrd(l, VF) {
  // console.log(l,VF);
  //visual field
  var Xm = VF[0][0],
    Yn = VF[0][1],//changed
    Xn = VF[1][0],
    Ym = VF[1][1];//changed ^ swapped
  if (l.a == 0) {
    if (l.c == 0) {
      console.log("ERROR in L_DpData_To_epCrd: the line doesn't exist.");
      return;
    }
    //[|]
    if (l.b < Xm || l.b > Xn) {
      return [false, [0, 0], [0, 0]];
    }
    var tM = (Ym - l.d) / l.c,
      tN = (Yn - l.d) / l.c;
    var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
      t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
  } else if (l.c == 0) {
    //[-]
    // console.log("c==0", l.d, Ym, Yn);
    if (l.d < Ym || l.d > Yn) {
      return [false, [0, 0], [0, 0]];
    }
    // console.log("access");
    var tM = (Xm - l.b) / l.a,
      tN = (Xn - l.b) / l.a;
    var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
      t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
  } else {
    //[/]
    //compare X
    var Ym_t = (Ym - l.d) / l.c,
      Yn_t = (Yn - l.d) / l.c,
      Xm_t = (Xm - l.b) / l.a,
      Xn_t = (Xn - l.b) / l.a;
    var Ym_t_X = Ym_t * l.a + l.b,
      Yn_t_X = Yn_t * l.a + l.b;
    var Ymn_minX = Math.min(Ym_t_X, Yn_t_X),
      Ymn_maxX = Math.max(Ym_t_X, Yn_t_X),
      Ymn_minX_t = Ym_t_X < Yn_t_X ? Ym_t : Yn_t,
      Ymn_maxX_t = Ym_t_X > Yn_t_X ? Ym_t : Yn_t;
    if ((Ymn_minX < Xm && Ymn_maxX < Xm) || (Ymn_minX > Xn && Ymn_maxX > Xn)) {
      return [false, [0, 0], [0, 0]];
    }
    var tA = Ymn_minX > Xm ? Ymn_minX_t : Xm_t,
      tB = Ymn_maxX < Xn ? Ymn_maxX_t : Xn_t;
    var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tA, tB)),
      t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tA, tB));
  }
  return [
    true,
    [l.a * t1 + l.b, l.c * t1 + l.d],
    [l.a * t2 + l.b, l.c * t2 + l.d],
  ];
}

export function haveEqualIndex(arr1, arr2) {
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j].obj.index == arr2[i].obj.index) {
        return true;
      }
    }
  }
  return false;
}