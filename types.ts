
export type GameId = 'HOME' | 'LAYOUT_MAGIC' | 'COMPOSE_INTRO' | 'DATA_DRIVEN' | 'COLUMN_ADVENTURE' | 'ROW_ADVENTURE' | 'BOX_ADVENTURE' | 'ARRANGEMENT_LAB';

export enum LayoutDirection {
  ROW = 'row',
  COLUMN = 'column'
}

export enum MainAxisAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly'
}

export enum CrossAxisAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  STRETCH = 'stretch'
}