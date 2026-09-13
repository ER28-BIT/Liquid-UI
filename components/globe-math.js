/** Orthographic projection, degrees in / normalized screen coordinates out. */
export function toVector([longitude, latitude]) {
  const lon = longitude * Math.PI / 180, lat = latitude * Math.PI / 180;
  return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
}
export function projectVector([x, y, z], longitude, latitude) {
  const a = -longitude * Math.PI / 180, b = latitude * Math.PI / 180;
  const rx = x * Math.cos(a) + z * Math.sin(a);
  const rz = z * Math.cos(a) - x * Math.sin(a);
  return [rx, -(y * Math.cos(b) - rz * Math.sin(b)), y * Math.sin(b) + rz * Math.cos(b)];
}
export function validateMarkers(markers) {
  if (!Array.isArray(markers)) throw new TypeError('markers must be an array');
  const ids = new Set();
  return markers.map(marker => {
    const {id, label, coordinates} = marker;
    if (typeof id !== 'string' || !id || ids.has(id)) throw new TypeError('marker IDs must be unique nonempty strings');
    if (typeof label !== 'string' || !label) throw new TypeError('marker labels must be nonempty strings');
    if (!Array.isArray(coordinates) || coordinates.length !== 2 || !coordinates.every(Number.isFinite) || Math.abs(coordinates[0]) > 180 || Math.abs(coordinates[1]) > 90) throw new RangeError('marker coordinates must be [longitude, latitude] in degrees');
    ids.add(id);
    return {id, label, coordinates: [...coordinates]};
  });
}

/** Connections express consumer-supplied relationships, never inferred transactions. */
export function validateConnections(connections, markers) {
  if (!Array.isArray(connections)) throw new TypeError('connections must be an array');
  const markerIds = new Set(markers.map(m => m.id)), ids = new Set();
  return connections.map(connection => {
    const {id, source, target, label} = connection ?? {};
    if (typeof id !== 'string' || !id || ids.has(id)) throw new TypeError('connection IDs must be unique nonempty strings');
    if (!markerIds.has(source) || !markerIds.has(target) || source === target) throw new RangeError('connection endpoints must be distinct existing marker IDs');
    if (typeof label !== 'string' || !label.trim()) throw new TypeError('connections need a readable relationship label');
    ids.add(id);
    return {id, source, target, label};
  });
}
