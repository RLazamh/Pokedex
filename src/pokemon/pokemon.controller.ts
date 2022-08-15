import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes';
import { PaginationDto } from '../common/dtos';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode( HttpStatus.CREATED )
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.pokemonService.findAll( paginationDto );
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
