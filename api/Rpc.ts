import { GenerateFunctionsType } from '@/types/bright.types'
import BrightBaseFunctions from './BrightBase/BrightFunctions'

const Functions: (keyof FunctionsType)[] = ['get_ticket', 'get_tickets']

type FunctionsType = GenerateFunctionsType

const functions = new BrightBaseFunctions<FunctionsType>(Functions).functions

export default functions
