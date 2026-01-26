// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export interface BoundingBox {
  min: Vec3;
  max: Vec3;
}
export class CollisionDetector {
  public checkAABB(box1: BoundingBox, box2: BoundingBox): boolean {
    if (stryMutAct_9fa48("1117")) {
      {}
    } else {
      stryCov_9fa48("1117");
      return stryMutAct_9fa48("1120") ? box1.min.x <= box2.max.x && box1.max.x >= box2.min.x && box1.min.y <= box2.max.y && box1.max.y >= box2.min.y && box1.min.z <= box2.max.z || box1.max.z >= box2.min.z : stryMutAct_9fa48("1119") ? false : stryMutAct_9fa48("1118") ? true : (stryCov_9fa48("1118", "1119", "1120"), (stryMutAct_9fa48("1122") ? box1.min.x <= box2.max.x && box1.max.x >= box2.min.x && box1.min.y <= box2.max.y && box1.max.y >= box2.min.y || box1.min.z <= box2.max.z : stryMutAct_9fa48("1121") ? true : (stryCov_9fa48("1121", "1122"), (stryMutAct_9fa48("1124") ? box1.min.x <= box2.max.x && box1.max.x >= box2.min.x && box1.min.y <= box2.max.y || box1.max.y >= box2.min.y : stryMutAct_9fa48("1123") ? true : (stryCov_9fa48("1123", "1124"), (stryMutAct_9fa48("1126") ? box1.min.x <= box2.max.x && box1.max.x >= box2.min.x || box1.min.y <= box2.max.y : stryMutAct_9fa48("1125") ? true : (stryCov_9fa48("1125", "1126"), (stryMutAct_9fa48("1128") ? box1.min.x <= box2.max.x || box1.max.x >= box2.min.x : stryMutAct_9fa48("1127") ? true : (stryCov_9fa48("1127", "1128"), (stryMutAct_9fa48("1131") ? box1.min.x > box2.max.x : stryMutAct_9fa48("1130") ? box1.min.x < box2.max.x : stryMutAct_9fa48("1129") ? true : (stryCov_9fa48("1129", "1130", "1131"), box1.min.x <= box2.max.x)) && (stryMutAct_9fa48("1134") ? box1.max.x < box2.min.x : stryMutAct_9fa48("1133") ? box1.max.x > box2.min.x : stryMutAct_9fa48("1132") ? true : (stryCov_9fa48("1132", "1133", "1134"), box1.max.x >= box2.min.x)))) && (stryMutAct_9fa48("1137") ? box1.min.y > box2.max.y : stryMutAct_9fa48("1136") ? box1.min.y < box2.max.y : stryMutAct_9fa48("1135") ? true : (stryCov_9fa48("1135", "1136", "1137"), box1.min.y <= box2.max.y)))) && (stryMutAct_9fa48("1140") ? box1.max.y < box2.min.y : stryMutAct_9fa48("1139") ? box1.max.y > box2.min.y : stryMutAct_9fa48("1138") ? true : (stryCov_9fa48("1138", "1139", "1140"), box1.max.y >= box2.min.y)))) && (stryMutAct_9fa48("1143") ? box1.min.z > box2.max.z : stryMutAct_9fa48("1142") ? box1.min.z < box2.max.z : stryMutAct_9fa48("1141") ? true : (stryCov_9fa48("1141", "1142", "1143"), box1.min.z <= box2.max.z)))) && (stryMutAct_9fa48("1146") ? box1.max.z < box2.min.z : stryMutAct_9fa48("1145") ? box1.max.z > box2.min.z : stryMutAct_9fa48("1144") ? true : (stryCov_9fa48("1144", "1145", "1146"), box1.max.z >= box2.min.z)));
    }
  }
  public pointInBox(point: Vec3, box: BoundingBox): boolean {
    if (stryMutAct_9fa48("1147")) {
      {}
    } else {
      stryCov_9fa48("1147");
      return stryMutAct_9fa48("1150") ? point.x >= box.min.x && point.x <= box.max.x && point.y >= box.min.y && point.y <= box.max.y && point.z >= box.min.z || point.z <= box.max.z : stryMutAct_9fa48("1149") ? false : stryMutAct_9fa48("1148") ? true : (stryCov_9fa48("1148", "1149", "1150"), (stryMutAct_9fa48("1152") ? point.x >= box.min.x && point.x <= box.max.x && point.y >= box.min.y && point.y <= box.max.y || point.z >= box.min.z : stryMutAct_9fa48("1151") ? true : (stryCov_9fa48("1151", "1152"), (stryMutAct_9fa48("1154") ? point.x >= box.min.x && point.x <= box.max.x && point.y >= box.min.y || point.y <= box.max.y : stryMutAct_9fa48("1153") ? true : (stryCov_9fa48("1153", "1154"), (stryMutAct_9fa48("1156") ? point.x >= box.min.x && point.x <= box.max.x || point.y >= box.min.y : stryMutAct_9fa48("1155") ? true : (stryCov_9fa48("1155", "1156"), (stryMutAct_9fa48("1158") ? point.x >= box.min.x || point.x <= box.max.x : stryMutAct_9fa48("1157") ? true : (stryCov_9fa48("1157", "1158"), (stryMutAct_9fa48("1161") ? point.x < box.min.x : stryMutAct_9fa48("1160") ? point.x > box.min.x : stryMutAct_9fa48("1159") ? true : (stryCov_9fa48("1159", "1160", "1161"), point.x >= box.min.x)) && (stryMutAct_9fa48("1164") ? point.x > box.max.x : stryMutAct_9fa48("1163") ? point.x < box.max.x : stryMutAct_9fa48("1162") ? true : (stryCov_9fa48("1162", "1163", "1164"), point.x <= box.max.x)))) && (stryMutAct_9fa48("1167") ? point.y < box.min.y : stryMutAct_9fa48("1166") ? point.y > box.min.y : stryMutAct_9fa48("1165") ? true : (stryCov_9fa48("1165", "1166", "1167"), point.y >= box.min.y)))) && (stryMutAct_9fa48("1170") ? point.y > box.max.y : stryMutAct_9fa48("1169") ? point.y < box.max.y : stryMutAct_9fa48("1168") ? true : (stryCov_9fa48("1168", "1169", "1170"), point.y <= box.max.y)))) && (stryMutAct_9fa48("1173") ? point.z < box.min.z : stryMutAct_9fa48("1172") ? point.z > box.min.z : stryMutAct_9fa48("1171") ? true : (stryCov_9fa48("1171", "1172", "1173"), point.z >= box.min.z)))) && (stryMutAct_9fa48("1176") ? point.z > box.max.z : stryMutAct_9fa48("1175") ? point.z < box.max.z : stryMutAct_9fa48("1174") ? true : (stryCov_9fa48("1174", "1175", "1176"), point.z <= box.max.z)));
    }
  }
}