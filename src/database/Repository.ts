import mysql, { RowDataPacket } from "mysql2/promise";
import { env } from "../configs/env";
import Log from "../utils/logger";

interface Query {
  sql: string;
  params?: any[];
}

class Repository {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: env.database.host,
      user: env.database.username,
      password: env.database.password,
      port: env.database.port,
      database: env.database.name,
      dateStrings: true,
      charset: "utf8mb4",
      connectionLimit: 10,
    });
  }

  public title = (title: string) => {
    Log.info("Mapped to %s", title);
  };

  public async transaction(runInTransaction: (transactionManager: mysql.PoolConnection) => Promise<any>) {
    let rows = null;
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();

      const result = await runInTransaction(conn);
      rows = result[0];

      await conn.commit();
    } catch (e) {
      conn.rollback();
      Log.error(e);
    } finally {
      conn.release();
    }

    return rows;
  }

  public async query(sql: string, params?: any): Promise<any> {
    let rows = null;
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();

      Log.debug("sql: %s", sql);
      Log.debug("params: %o", params);
      const result = await conn.execute(sql, params);
      rows = result[0];

      await conn.commit();
    } catch (e) {
      conn.rollback();
      Log.error(e);
    } finally {
      conn.release();
    }

    return rows;
  }

  public async queryForObject(sql: string, params?: any): Promise<any> {
    let rows = null;
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();

      Log.debug("sql: %s", sql);
      Log.debug("params: %o", params);
      const result = await conn.execute(sql, params);
      rows = result[0] as RowDataPacket[0][0];

      await conn.commit();
    } catch (e) {
      conn.rollback();
      Log.error(e);
    } finally {
      conn.release();
    }

    return rows[0];
  }

  public async bulkQuery(queries: Query[]): Promise<void> {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();

      for (const ele of queries) {
        Log.debug("sql: %s", ele.sql);
        Log.debug("params: %o", ele.params);
        await conn.execute(ele.sql, ele.params);
      }

      await conn.commit();
    } catch (e) {
      conn.rollback();
      Log.error(e);
    } finally {
      conn.release();
    }
  }

  public escape = (data: string) => mysql.escape(data);
}

export default Repository;
