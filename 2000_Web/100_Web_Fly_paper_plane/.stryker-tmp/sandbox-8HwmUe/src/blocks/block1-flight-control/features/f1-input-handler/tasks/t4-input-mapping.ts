/**
 * Task 1.1.4: Input Mapping Configuration
 *
 * Manages user-configurable key bindings with runtime changes.
 * Stores mappings in LocalStorage for persistence.
 * Prevents duplicate keys across different directions.
 *
 * @example
 * const manager = new InputMappingManager()
 * manager.addKey('forward', 'e')  // Add 'E' to forward
 * manager.removeKey('backward', 's')  // Remove 'S' from backward
 * manager.save()  // Persist to LocalStorage
 * manager.resetToDefault()  // Restore default mappings
 */
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
export interface InputMapping {
  forward: string[];
  backward: string[];
  left: string[];
  right: string[];
}
export type Direction = keyof InputMapping;

// Default key bindings (WASD + Arrow keys)
export const DEFAULT_MAPPING: InputMapping = stryMutAct_9fa48("94") ? {} : (stryCov_9fa48("94"), {
  forward: stryMutAct_9fa48("95") ? [] : (stryCov_9fa48("95"), [stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'w'), stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), 'arrowup')]),
  backward: stryMutAct_9fa48("98") ? [] : (stryCov_9fa48("98"), [stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), 's'), stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), 'arrowdown')]),
  left: stryMutAct_9fa48("101") ? [] : (stryCov_9fa48("101"), [stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), 'a'), stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'arrowleft')]),
  right: stryMutAct_9fa48("104") ? [] : (stryCov_9fa48("104"), [stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), 'd'), stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), 'arrowright')])
});

// Constants (Explicit, Adaptive)
const STORAGE_KEY = stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), 'fly-paper-plane-input-mapping');
const DIRECTIONS: Direction[] = stryMutAct_9fa48("108") ? [] : (stryCov_9fa48("108"), [stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), 'forward'), stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), 'backward'), stryMutAct_9fa48("111") ? "" : (stryCov_9fa48("111"), 'left'), stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), 'right')]);
export class InputMappingManager {
  private mapping: InputMapping;
  constructor() {
    if (stryMutAct_9fa48("113")) {
      {}
    } else {
      stryCov_9fa48("113");
      this.mapping = stryMutAct_9fa48("116") ? this.loadFromStorage() && this.cloneMapping(DEFAULT_MAPPING) : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116"), this.loadFromStorage() || this.cloneMapping(DEFAULT_MAPPING));
    }
  }
  private loadFromStorage(): InputMapping | null {
    if (stryMutAct_9fa48("117")) {
      {}
    } else {
      stryCov_9fa48("117");
      try {
        if (stryMutAct_9fa48("118")) {
          {}
        } else {
          stryCov_9fa48("118");
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stryMutAct_9fa48("121") ? false : stryMutAct_9fa48("120") ? true : stryMutAct_9fa48("119") ? stored : (stryCov_9fa48("119", "120", "121"), !stored)) return null;
          const parsed = JSON.parse(stored);
          return this.validateMapping(parsed) ? parsed : null;
        }
      } catch {
        if (stryMutAct_9fa48("122")) {
          {}
        } else {
          stryCov_9fa48("122");
          return null;
        }
      }
    }
  }
  private validateMapping(mapping: any): mapping is InputMapping {
    if (stryMutAct_9fa48("123")) {
      {}
    } else {
      stryCov_9fa48("123");
      if (stryMutAct_9fa48("126") ? !mapping && typeof mapping !== 'object' : stryMutAct_9fa48("125") ? false : stryMutAct_9fa48("124") ? true : (stryCov_9fa48("124", "125", "126"), (stryMutAct_9fa48("127") ? mapping : (stryCov_9fa48("127"), !mapping)) || (stryMutAct_9fa48("129") ? typeof mapping === 'object' : stryMutAct_9fa48("128") ? false : (stryCov_9fa48("128", "129"), typeof mapping !== (stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'object')))))) return stryMutAct_9fa48("131") ? true : (stryCov_9fa48("131"), false);
      return stryMutAct_9fa48("132") ? DIRECTIONS.some(dir => Array.isArray(mapping[dir]) && mapping[dir].every((k: any) => typeof k === 'string')) : (stryCov_9fa48("132"), DIRECTIONS.every(stryMutAct_9fa48("133") ? () => undefined : (stryCov_9fa48("133"), dir => stryMutAct_9fa48("136") ? Array.isArray(mapping[dir]) || mapping[dir].every((k: any) => typeof k === 'string') : stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : (stryCov_9fa48("134", "135", "136"), Array.isArray(mapping[dir]) && (stryMutAct_9fa48("137") ? mapping[dir].some((k: any) => typeof k === 'string') : (stryCov_9fa48("137"), mapping[dir].every(stryMutAct_9fa48("138") ? () => undefined : (stryCov_9fa48("138"), (k: any) => stryMutAct_9fa48("141") ? typeof k !== 'string' : stryMutAct_9fa48("140") ? false : stryMutAct_9fa48("139") ? true : (stryCov_9fa48("139", "140", "141"), typeof k === (stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), 'string')))))))))));
    }
  }
  private cloneMapping(mapping: InputMapping): InputMapping {
    if (stryMutAct_9fa48("143")) {
      {}
    } else {
      stryCov_9fa48("143");
      return stryMutAct_9fa48("144") ? {} : (stryCov_9fa48("144"), {
        forward: stryMutAct_9fa48("145") ? [] : (stryCov_9fa48("145"), [...mapping.forward]),
        backward: stryMutAct_9fa48("146") ? [] : (stryCov_9fa48("146"), [...mapping.backward]),
        left: stryMutAct_9fa48("147") ? [] : (stryCov_9fa48("147"), [...mapping.left]),
        right: stryMutAct_9fa48("148") ? [] : (stryCov_9fa48("148"), [...mapping.right])
      });
    }
  }
  private normalizeKey(key: string): string {
    if (stryMutAct_9fa48("149")) {
      {}
    } else {
      stryCov_9fa48("149");
      return stryMutAct_9fa48("150") ? key.toUpperCase() : (stryCov_9fa48("150"), key.toLowerCase());
    }
  }
  private removeDuplicatesInDirection(direction: Direction): void {
    if (stryMutAct_9fa48("151")) {
      {}
    } else {
      stryCov_9fa48("151");
      this.mapping[direction] = stryMutAct_9fa48("152") ? [] : (stryCov_9fa48("152"), [...new Set(this.mapping[direction])]);
    }
  }
  private removeKeyFromAllDirections(key: string): void {
    if (stryMutAct_9fa48("153")) {
      {}
    } else {
      stryCov_9fa48("153");
      const normalized = this.normalizeKey(key);
      DIRECTIONS.forEach(dir => {
        if (stryMutAct_9fa48("154")) {
          {}
        } else {
          stryCov_9fa48("154");
          this.mapping[dir] = stryMutAct_9fa48("155") ? this.mapping[dir] : (stryCov_9fa48("155"), this.mapping[dir].filter(stryMutAct_9fa48("156") ? () => undefined : (stryCov_9fa48("156"), k => stryMutAct_9fa48("159") ? k === normalized : stryMutAct_9fa48("158") ? false : stryMutAct_9fa48("157") ? true : (stryCov_9fa48("157", "158", "159"), k !== normalized))));
        }
      });
    }
  }
  private removeDuplicatesAcrossDirections(): void {
    if (stryMutAct_9fa48("160")) {
      {}
    } else {
      stryCov_9fa48("160");
      const seen = new Set<string>();

      // Process in reverse to keep last occurrence
      for (let i = stryMutAct_9fa48("161") ? DIRECTIONS.length + 1 : (stryCov_9fa48("161"), DIRECTIONS.length - 1); stryMutAct_9fa48("164") ? i < 0 : stryMutAct_9fa48("163") ? i > 0 : stryMutAct_9fa48("162") ? false : (stryCov_9fa48("162", "163", "164"), i >= 0); stryMutAct_9fa48("165") ? i++ : (stryCov_9fa48("165"), i--)) {
        if (stryMutAct_9fa48("166")) {
          {}
        } else {
          stryCov_9fa48("166");
          const dir = DIRECTIONS[i];
          const uniqueKeys: string[] = stryMutAct_9fa48("167") ? ["Stryker was here"] : (stryCov_9fa48("167"), []);
          for (let j = stryMutAct_9fa48("168") ? this.mapping[dir].length + 1 : (stryCov_9fa48("168"), this.mapping[dir].length - 1); stryMutAct_9fa48("171") ? j < 0 : stryMutAct_9fa48("170") ? j > 0 : stryMutAct_9fa48("169") ? false : (stryCov_9fa48("169", "170", "171"), j >= 0); stryMutAct_9fa48("172") ? j++ : (stryCov_9fa48("172"), j--)) {
            if (stryMutAct_9fa48("173")) {
              {}
            } else {
              stryCov_9fa48("173");
              const key = this.mapping[dir][j];
              if (stryMutAct_9fa48("176") ? false : stryMutAct_9fa48("175") ? true : stryMutAct_9fa48("174") ? seen.has(key) : (stryCov_9fa48("174", "175", "176"), !seen.has(key))) {
                if (stryMutAct_9fa48("177")) {
                  {}
                } else {
                  stryCov_9fa48("177");
                  seen.add(key);
                  uniqueKeys.unshift(key);
                }
              }
            }
          }
          this.mapping[dir] = uniqueKeys;
        }
      }
    }
  }
  public getMapping(): InputMapping {
    if (stryMutAct_9fa48("178")) {
      {}
    } else {
      stryCov_9fa48("178");
      return this.cloneMapping(this.mapping);
    }
  }
  public setMapping(mapping: InputMapping): void {
    if (stryMutAct_9fa48("179")) {
      {}
    } else {
      stryCov_9fa48("179");
      this.mapping = this.cloneMapping(mapping);
      this.removeDuplicatesAcrossDirections();
      this.save();
    }
  }
  public resetToDefault(): void {
    if (stryMutAct_9fa48("180")) {
      {}
    } else {
      stryCov_9fa48("180");
      this.mapping = this.cloneMapping(DEFAULT_MAPPING);
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  public addKey(direction: Direction, key: string): void {
    if (stryMutAct_9fa48("181")) {
      {}
    } else {
      stryCov_9fa48("181");
      const normalized = this.normalizeKey(key);

      // Validate key format
      if (stryMutAct_9fa48("184") ? normalized !== '' : stryMutAct_9fa48("183") ? false : stryMutAct_9fa48("182") ? true : (stryCov_9fa48("182", "183", "184"), normalized === (stryMutAct_9fa48("185") ? "Stryker was here!" : (stryCov_9fa48("185"), '')))) return;

      // Remove key from all directions first (prevent duplicates)
      this.removeKeyFromAllDirections(normalized);

      // Add to target direction
      this.mapping[direction].push(normalized);

      // Remove duplicates within direction
      this.removeDuplicatesInDirection(direction);
      this.save();
    }
  }
  public removeKey(direction: Direction, key: string): void {
    if (stryMutAct_9fa48("186")) {
      {}
    } else {
      stryCov_9fa48("186");
      const normalized = this.normalizeKey(key);
      this.mapping[direction] = stryMutAct_9fa48("187") ? this.mapping[direction] : (stryCov_9fa48("187"), this.mapping[direction].filter(stryMutAct_9fa48("188") ? () => undefined : (stryCov_9fa48("188"), k => stryMutAct_9fa48("191") ? k === normalized : stryMutAct_9fa48("190") ? false : stryMutAct_9fa48("189") ? true : (stryCov_9fa48("189", "190", "191"), k !== normalized))));
      this.save();
    }
  }
  public save(): void {
    if (stryMutAct_9fa48("192")) {
      {}
    } else {
      stryCov_9fa48("192");
      try {
        if (stryMutAct_9fa48("193")) {
          {}
        } else {
          stryCov_9fa48("193");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mapping));
        }
      } catch {
        // Silent fail (e.g., quota exceeded, private browsing)
      }
    }
  }
  public isKeyMapped(key: string): boolean {
    if (stryMutAct_9fa48("194")) {
      {}
    } else {
      stryCov_9fa48("194");
      const normalized = this.normalizeKey(key);
      return stryMutAct_9fa48("195") ? DIRECTIONS.every(dir => this.mapping[dir].includes(normalized)) : (stryCov_9fa48("195"), DIRECTIONS.some(stryMutAct_9fa48("196") ? () => undefined : (stryCov_9fa48("196"), dir => this.mapping[dir].includes(normalized))));
    }
  }
  public getDirectionForKey(key: string): Direction | null {
    if (stryMutAct_9fa48("197")) {
      {}
    } else {
      stryCov_9fa48("197");
      const normalized = this.normalizeKey(key);
      for (const dir of DIRECTIONS) {
        if (stryMutAct_9fa48("198")) {
          {}
        } else {
          stryCov_9fa48("198");
          if (stryMutAct_9fa48("200") ? false : stryMutAct_9fa48("199") ? true : (stryCov_9fa48("199", "200"), this.mapping[dir].includes(normalized))) {
            if (stryMutAct_9fa48("201")) {
              {}
            } else {
              stryCov_9fa48("201");
              return dir;
            }
          }
        }
      }
      return null;
    }
  }
}