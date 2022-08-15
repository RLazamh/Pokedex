import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private pokemons : CreatePokemonDto[] = [];

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http : AxiosAdapter,
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany();
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');

    data.results.forEach(({ name , url }) =>{
      const segments = url.split('/');

      this.pokemons.push({
        'no' : +segments[ segments.length - 2 ],
        'name' : name.toLocaleLowerCase(),
      })
    })

    await this.pokemonModel.insertMany( this.pokemons )

    return {"Seed executed?": true};
  }

}
