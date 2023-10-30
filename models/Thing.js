class Thing {
  static client = null;
  static tableName = 'things';
  static attributes = {
    body: 'string',
    updatedAt: 'string',
    createdAt: 'string',
  };

  //INSERT INTO "things"("body") VALUES ('test text 3') RETURNING *;
  static async create(values) {
    try {
      const insertAttrs = Object.entries(this.attributes)
        .filter(([attr, domain]) => attr in values)
        .map(([attr, domain]) => attr);
      const attrsRow = insertAttrs.map((attr) => `"${attr}"`).join(',');
      const valuesRow = insertAttrs
        .map((attr) => {
          const value = values[attr];
          const typeValue = typeof this.attributes[attr];
          return typeValue === 'string' ? `'${value}'` : value;
        })
        .join(',');
      const { rows } = await this.client.query(`
        INSERT INTO ${this.tableName}(${attrsRow}) VALUES (${valuesRow}) RETURNING *;
    `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  //SELECT * FROM "things";
  static async findAll() {
    try {
      const { rows } = await this.client.query(`
      SELECT *
      FROM ${this.tableName};
    `);
      return rows;
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
