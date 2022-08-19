import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Pokemon, PokemonSchema } from './entities';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService] ,
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name:  Pokemon.name, // ES DE LO QUE SE EXTENDIO DEL DOCUMENTO 
        schema: PokemonSchema, 
      }
    ])
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
