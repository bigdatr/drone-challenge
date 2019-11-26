class BillboardManager {
  constructor(props) {
    this.billboardMap = new Map();
  }

  insertBillboard(x, y, insertingDroneId) {
    const coordKey = `${x},${y}`;
    const billboardAtCoord = this.billboardMap.get(coordKey);
    this.billboardMap.set(coordKey, {
      visitCount: billboardAtCoord ? (billboardAtCoord.visitCount += 1) : 1,
      coordinates: { x, y },
      visits: [
        {
          timestamp: Date.now(),
          droneId: insertingDroneId
        },
        ...(billboardAtCoord ? billboardAtCoord.visits : [])
      ]
    });
  }

  getCurrentBillboards() {
    return Array.from(this.billboardMap);
  }
}

module.exports = BillboardManager;
