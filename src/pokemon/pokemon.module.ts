import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService] ,
  imports: [
    MongooseModule.forFeature([
      {
        name:  Pokemon.name, // ES DE LO QUE SE EXTENDIO DEL DOCUMENTO 
        schema: PokemonSchema, 

      }
    ])
  ]
})
export class PokemonModule {}
