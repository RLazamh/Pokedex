import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':no')
  findOne(@Param( 'no' , ParseIntPipe ) no: number ) {
    console.log( no )
    return this.pokemonService.findOne( no );
  }

  @Patch(':no')
  update(
    @Param('no' , ParseIntPipe ) no: number, 
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    console.log( no )
    return this.pokemonService.update( no, updatePokemonDto);
  }

  @Delete(':no')
  remove(@Param('no' , ParseIntPipe ) no: number ) {
    return this.pokemonService.remove( no );
  }
}
