import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    return createPokemonDto;
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
