#!/bin/bash
cd "/Users/fuadkazi/Desktop/Ideom/Ideom branding:site :/Ideom website build/home site v2/carousel image refs/emails "
i=1
for f in *.webp *.png; do
  if [ -f "$f" ]; then
    ext="${f##*.}"
    cp "$f" "/Users/fuadkazi/Desktop/Ideom/Ideom branding:site :/Ideom website build/home site v2/-2-ideom.io/public/campaigns/emails/email_$(printf '%02d' $i).$ext"
    i=$((i+1))
  fi
done

cd "part 2"
for f in *.png; do
  if [ -f "$f" ]; then
    cp "$f" "/Users/fuadkazi/Desktop/Ideom/Ideom branding:site :/Ideom website build/home site v2/-2-ideom.io/public/campaigns/emails/email_$(printf '%02d' $i).png"
    i=$((i+1))
  fi
done
echo "DONE"
