import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>,
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    }
    catch(error) {
      console.log(error);
      if( error.code === 11000 ) throw new BadRequestException( `Pokemon already exist ${ JSON.stringify( error.keyValue ) }`) // keyValue no exists 
      
      throw new InternalServerErrorException( `Cann't create Pokemon Check server log `);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(no: number) {
    return `This action returns a #${no} pokemon`;
  }

  update(no: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${no} pokemon`;
  }

  remove(no: number) {
    return `This action removes a #${no} pokemon`;
  }
}
