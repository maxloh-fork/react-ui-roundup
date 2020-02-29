import {
  repeat,
  length,
  map,
  join,
  pipe,
  sortBy,
  prop,
} from 'ramda';
import { repeatStr } from 'ramda-adjunct';
import { URL, DesignKit, FrameworkFeaturesById } from '../entities';

export const lines = join('\n');

export const h1 = (text: string) => disclaim(`# ${text}\n`);
export const h2 = (text: string) => disclaim(`## ${text}\n`);
export const h3 = (text: string) => disclaim(`### ${text}\n`);
export const h4 = (text: string) => disclaim(`#### ${text}\n`);
export const p = (text: string)  => disclaim(`${text}\n`);
export const link = ({ text, href }: { text: string; href: URL }) => `[${text}](${href})`;
export const comment = (text: string) => `<!--${text}-->`;
export const inlineCode = (text: string) => `\`${text}\``;
export const quote = (text: string) => disclaim(`> ${text}\n`);
export const checkmark = (value: boolean | undefined) => value === undefined ? ':question:' : value ? ':heavy_check_mark:' : ':x:';

export const row = (data: string[]) => `| ${join(' | ', data)} |`;

export const table = ({ headers, rows }: { headers: string[], rows: string[][] }) => {
  return disclaim([
    row(headers),
    row(repeat('---', length(headers))),
    ...map(row, rows),
    '',
  ]);
};

export const disclaimer = comment(lines([
  '',
  repeatStr('*', 80),
  'THIS FILE ENTIRE FILE IS AUTOGENERATED!!!',
  'PLEASE SEE `generate-readme.ts` and the files in the `frameworks` directory if you would like to make changes :)',
  repeatStr('*', 80),
  '',
]));

export const websiteHref = 'http://react-ui-roundup.dimitrimitropoulos.com';
export const website = link({ text: 'react-ui-roundup.dimitrimitropoulos.com', href: websiteHref });

export const disclaim = (input: string[] | string) => lines([
  disclaimer,
  ...(Array.isArray(input) ? input : [input]),
]);

export const stringArray = (input: string[] | null) => input ? pipe(
  map(inlineCode),
  join(', '),
)(input.sort()) : '';

export const designKits = (designKits: FrameworkFeaturesById['designKits']) => designKits !== false ? (
  pipe<DesignKit[], DesignKit[], { text: string, href: string }[], string[], string>(
    sortBy(prop('type')),
    map(({ type, href }) => ({ text: type, href: href })),
    map(link),
    join(', '),
  )(designKits)
) : checkmark(false);

export const themer = (themer: FrameworkFeaturesById['themer']) => themer !== false ? (
  link({ text: 'True', href: themer })
) : checkmark(themer);

export const criteria = (items: [string, string][]) => lines([
  h4('Criteria'),
  ...map(([name, description]) => `- ${inlineCode(name)}: ${description}`, items),
  '',
])