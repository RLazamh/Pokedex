import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios : AxiosInstance = axios;
  private pokemons : CreatePokemonDto[] = [];

  constructor(
    private readonly pokemonService : PokemonService,
  ){}
  
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');

    data.results.forEach(({ name , url }) =>{
      const segments = url.split('/');

      this.pokemons.push({
        'no' : +segments[ segments.length - 2 ],
        'name' : name.toLocaleLowerCase(),
      })
    })

    await this.pokemonService.createMany( this.pokemons )

    return data;
  }

}
