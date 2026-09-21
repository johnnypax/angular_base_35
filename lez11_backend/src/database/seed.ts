import { AppDataSource } from './dataSource';
import { CategoryEntity, PathEntity, PoiEntity } from '../models/entities';

const poiSeed = [
  ['Colosseo', 'Anfiteatro romano simbolo di Roma', 'Piazza del Colosseo, Roma', 'Monumento', 41.8902, 12.4922],
  ['Foro Romano', 'Area archeologica del centro di Roma antica', 'Via della Salara Vecchia, Roma', 'Area archeologica', 41.8925, 12.4853],
  ['Pantheon', 'Tempio romano trasformato in basilica', 'Piazza della Rotonda, Roma', 'Monumento', 41.8986, 12.4768],
  ['Musei Capitolini', 'Musei civici su Piazza del Campidoglio', 'Piazza del Campidoglio, Roma', 'Museo', 41.8931, 12.4828],
  ['Galleria Borghese', 'Museo d’arte nella Villa Borghese', 'Piazzale Scipione Borghese, Roma', 'Museo', 41.9142, 12.4922],
  ['Villa Borghese', 'Grande parco storico nel centro di Roma', 'Piazzale Napoleone I, Roma', 'Parco', 41.9140, 12.4923],
  ['Fontana di Trevi', 'Fontana monumentale barocca', 'Piazza di Trevi, Roma', 'Monumento', 41.9009, 12.4833],
  ['Piazza Navona', 'Piazza barocca con fontane monumentali', 'Piazza Navona, Roma', 'Piazza', 41.8992, 12.4731],
  ['Castel Sant’Angelo', 'Mausoleo di Adriano e fortezza papale', 'Lungotevere Castello, Roma', 'Monumento', 41.9031, 12.4663],
  ['Musei Vaticani', 'Complesso museale con collezioni pontificie', 'Viale Vaticano, Città del Vaticano', 'Museo', 41.9065, 12.4536],
  ['Basilica di San Pietro', 'Basilica rinascimentale in Vaticano', 'Piazza San Pietro, Città del Vaticano', 'Architettura religiosa', 41.9022, 12.4539],
  ['Trastevere', 'Quartiere storico noto per vicoli e ristorazione', 'Trastevere, Roma', 'Quartiere', 41.8897, 12.4708],
  ['Mercato di Campo de’ Fiori', 'Storico mercato all’aperto', 'Piazza Campo de’ Fiori, Roma', 'Mercato', 41.8957, 12.4722],
  ['Terme di Caracalla', 'Complesso termale monumentale romano', 'Viale delle Terme di Caracalla, Roma', 'Area archeologica', 41.8790, 12.4923],
  ['Giardino degli Aranci', 'Belvedere e giardino sul colle Aventino', 'Piazza Pietro d’Illiria, Roma', 'Parco', 41.8852, 12.4797]
] as const;

const pathsSeed = [
  { nome: 'Roma Antica', categorie: ['Storia', 'Arte'], poi: ['Colosseo', 'Foro Romano', 'Pantheon', 'Terme di Caracalla'] },
  { nome: 'Musei e Capolavori', categorie: ['Musei', 'Arte'], poi: ['Musei Capitolini', 'Galleria Borghese', 'Musei Vaticani'] },
  { nome: 'Roma Barocca', categorie: ['Arte', 'Architettura'], poi: ['Fontana di Trevi', 'Piazza Navona', 'Pantheon'] },
  { nome: 'Verde e Panorami', categorie: ['Natura', 'Architettura'], poi: ['Villa Borghese', 'Giardino degli Aranci', 'Castel Sant’Angelo'] },
  { nome: 'Sapori e Quartieri', categorie: ['Enogastronomia', 'Storia'], poi: ['Trastevere', 'Mercato di Campo de’ Fiori', 'Piazza Navona'] }
] as const;

export async function seedDatabase(): Promise<void> {
  const poiRepo = AppDataSource.getRepository<PoiEntity>('PoiEntity');
  const categoryRepo = AppDataSource.getRepository<CategoryEntity>('CategoryEntity');
  const pathRepo = AppDataSource.getRepository<PathEntity>('PathEntity');

  for (const [nome, descrizione, indirizzo, tipo, lat, lon] of poiSeed) {
    const existing = await poiRepo.findOne({ where: { nome } });
    if (!existing) {
      await poiRepo.save(poiRepo.create({ nome, descrizione, indirizzo, tipo, lat, lon }));
    }
  }

  const categoryNames = [...new Set(pathsSeed.flatMap((p) => [...p.categorie]))];
  for (const nome of categoryNames) {
    const existing = await categoryRepo.findOne({ where: { nome } });
    if (!existing) {
      await categoryRepo.save(categoryRepo.create({ nome }));
    }
  }

  for (const pathSeed of pathsSeed) {
    const existing = await pathRepo.findOne({
      where: { nome: pathSeed.nome },
      relations: { pois: true, categories: true }
    });
    if (existing) continue;

    const pois = await Promise.all(pathSeed.poi.map((nome) => poiRepo.findOneByOrFail({ nome })));
    const categories = await Promise.all(pathSeed.categorie.map((nome) => categoryRepo.findOneByOrFail({ nome })));
    await pathRepo.save(pathRepo.create({ nome: pathSeed.nome, pois, categories }));
  }
}
