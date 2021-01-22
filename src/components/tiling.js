export default function solve({ i, j }, a, depth = 0) {
  const n = a.length;
  if (n == 1) { // base case
    return [];
  }
  const LU = a.slice(0, n / 2).map(row => row.slice(0, n / 2));
  const RU = a.slice(0, n / 2).map(row => row.slice(n / 2, n));
  const RD = a.slice(n / 2, n).map(row => row.slice(n / 2, n));
  const LD = a.slice(n / 2, n).map(row => row.slice(0, n / 2));
  const lu = { i: n / 2 - 1, j: n / 2 - 1 };
  const ru = { i: n / 2 - 1, j: 0 };
  const rd = { i: 0, j: 0 };
  const ld = { i: 0, j: n / 2 - 1 };
  const res = [];
  if (i < n / 2 && j < n / 2) { // LU
    res.push({ depth, tiles: [RU[ru.i][ru.j], RD[rd.i][rd.j], LD[ld.i][ld.j]] });
    res.push(...solve({ i, j }, LU, depth + 1));
    res.push(...solve(ru, RU, depth + 1));
    res.push(...solve(rd, RD, depth + 1));
    res.push(...solve(ld, LD, depth + 1));
  } else if (i < n / 2 && j >= n / 2) { // RU
    res.push({ depth, tiles: [RD[rd.i][rd.j], LD[ld.i][ld.j], LU[lu.i][lu.j]] });
    res.push(...solve(lu, LU, depth + 1));
    res.push(...solve({ i, j: j - n / 2 }, RU, depth + 1));
    res.push(...solve(rd, RD, depth + 1));
    res.push(...solve(ld, LD, depth + 1));
  } else if (i >= n / 2 && j >= n / 2) { // RD
    res.push({ depth, tiles: [LD[ld.i][ld.j], LU[lu.i][lu.j], RU[ru.i][ru.j]] });
    res.push(...solve(lu, LU, depth + 1));
    res.push(...solve(ru, RU, depth + 1));
    res.push(...solve({ i: i - n / 2, j: j - n / 2 }, RD, depth + 1));
    res.push(...solve(ld, LD, depth + 1));
  } else { // LD
    res.push({ depth, tiles: [LU[lu.i][lu.j], RU[ru.i][ru.j], RD[rd.i][rd.j]] });
    res.push(...solve(lu, LU, depth + 1));
    res.push(...solve(ru, RU, depth + 1));
    res.push(...solve(rd, RD, depth + 1));
    res.push(...solve({ i: i - n / 2, j }, LD, depth + 1));
  }
  return res;
}
