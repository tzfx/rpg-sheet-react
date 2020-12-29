import { Race, Size } from './Race.interface';

class Human implements Race {
    name = 'Human';
    age = { min: 10, max: 100 };
    size = Size.medium;
    language = 'Common';
}

const human = new Human();
export { human };
