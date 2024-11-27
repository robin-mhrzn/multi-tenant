import { Injectable } from '@nestjs/common';
import { Connection, createConnection, Model } from 'mongoose';
import { TenantContextService } from 'src/helpers/tenant-context.service';

@Injectable()
export class DatabaseService {
  private connections: Map<string, Connection> = new Map();

  constructor(private readonly tenantContextService: TenantContextService) {}

  async getConnection(): Promise<Connection> {
    const tenantId = this.tenantContextService.getTenant();
    if (!this.connections.has(tenantId)) {
      const connection = await createConnection(
        `mongodb://localhost:27017/${tenantId}`,
        {
          //useNewUrlParser: true,
          //useUnifiedTopology: true,
        },
      );
      this.connections.set(tenantId, connection);
    }
    return this.connections.get(tenantId);
  }
  async getTenantModel<T>(modelName: string, schema: any): Promise<Model<T>> {
    const connection = await this.getConnection();
    return connection.model(modelName, schema);
  }
}
