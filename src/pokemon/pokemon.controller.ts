import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode( HttpStatus.CREATED )
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':query')
  findOne(@Param( 'query') query : string  ) {
    return this.pokemonService.findOne( query );
  }

  @Patch(':query')
  update(
    @Param('query') query: string, 
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update( query, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseMongoIdPipe ) id: string ) {
    return this.pokemonService.remove( id );
  }
}
