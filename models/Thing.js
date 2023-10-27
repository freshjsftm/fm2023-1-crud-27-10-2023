class Thing {
  static client = null;
  static tableName = 'things';

  static async create() {}

  //SELECT * FROM "things";
  static async findAll() {
    try {
      const result = await this.client.query(`
      SELECT *
      FROM ${this.tableName};
    `);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async findByPk(pk) {
    try {
      const result = await this.client.query(`
      SELECT *
      FROM ${this.tableName}
      WHERE "id"=${pk};
    `);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateByPk(pk) {}
  static async deleteByPk(pk) {}
}

module.exports = Thing;
