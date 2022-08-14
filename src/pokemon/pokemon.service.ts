import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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

  async findOne( query : string ) {

    let pokemon : Pokemon;

    // no
    if( !isNaN( +query ) ) pokemon = await this.pokemonModel.findOne( { 'no' : query })

    //  Mongo ID
    if( !pokemon && isValidObjectId( query )) pokemon = await this.pokemonModel.findById( query ) 

    // name 
    if( !pokemon ) pokemon = await this.pokemonModel.findOne({ name : query.toLowerCase().trim() })

    if( !pokemon ) throw new NotFoundException(` Pokemon with id, no or name "${ query }", not found`)

    return pokemon;
  }

  async update(query: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( query );

    if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLowerCase() 

    await pokemon.updateOne( updatePokemonDto )

    return { ...pokemon.toJSON() , ...updatePokemonDto }
  }

  remove(no: number) {
    return `This action removes a #${no} pokemon`;
  }
}
