# UKLAD

UKLAD (UKrainian-LAtin Duality, UKrajinśko-LAtynśka Dvojednisť) is a project aiming at introducing latinized alphabet to Ukrainian language while preserving the cyrillic form of writing.
See the example in ```examples/```, and the transliterator along with the keyboard in ```src/```.

You can also try out the transliterator [here](https://maxt86.github.io/UKLAD/src/trans/).

## Rules

```
1) vowels

и - y

ї, 'ї - ji

я - ja
є - je
ю - ju

'я - įa
'є - įe
'ю - įu

ьо - jo

йо:
- jo at the beginning of a word
- after a:
a) vowel - įo (except for й, in such case use jo)
b) non-consonant (all the vowels + ь) - jo

2) non-vowels

в - v

г - ğ
ґ - g

ж - ž

х - ch

ц - c

ч - č
ш - š
щ = шч - šč

й - į
* for йо, see above

ь - preceeding consonant + ' (ď ź ľ ń ś ť ć)
* for ьо, see above
** big ď and ť are represented by Ď and Ť, since big versions of those letters with ' are rarely used
```
