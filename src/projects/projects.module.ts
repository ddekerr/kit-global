import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './project.schema';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
})
export class ProjectsModule {}
