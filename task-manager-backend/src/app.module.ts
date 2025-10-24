import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; // ✅ ajoute cette ligne

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin123',
      database: 'taskmanager',
      entities: [Task, User],
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule, // ✅ ajoute aussi ici
  ],
})
export class AppModule {}
