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
      const { rows } = await this.client.query(`
      SELECT *
      FROM ${this.tableName}
      WHERE "id"=${pk};
    `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  // UPDATE "things"
  // SET "body"='new text', "updatedAt"=current_timestamp
  // WHERE "id"=1;
  static async updateByPk(pk, values) {
    try {
      const insertAttrs = Object.entries(this.attributes)
        .filter(([attr, domain]) => attr in values)
        .map(([attr, domain]) => attr);

      let setRow = insertAttrs.map((attr) => {
        const value = values[attr];
        const typeValue = typeof this.attributes[attr];
        const valueStr =  typeValue === 'string' ? `'${value}'` : value;
        const pareStr = `"${attr}"=${valueStr}`
        return pareStr;
      }).join(',');

      if('updatedAt' in values){
        console.log(values['updatedAt']);
      }else{
        setRow += `,"updatedAt"='${new Date().toISOString()}'`;
      }

      console.log('setRow---------->',setRow);

      const { rows } = await this.client.query(`
        UPDATE ${this.tableName}
        SET ${setRow}
        WHERE "id"=${pk}
        RETURNING *;        
        `);

      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteByPk(pk) {}
}

module.exports = Thing;
