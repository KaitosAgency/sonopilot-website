# Télécharge les avatars / artworks listés pour la LP (URLs issues de Supabase via MCP).
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$dest = Join-Path $root "public\images\lp-assets"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$pairs = @(
  @{ File = "avatar-01.jpg"; Url = "https://i1.sndcdn.com/avatars-iF0oAlxZpHRRuqws-jZ86OQ-large.jpg" }
  @{ File = "avatar-02.jpg"; Url = "https://i1.sndcdn.com/avatars-54VPjgQzDtNkJYDl-5lHvVg-large.jpg" }
  @{ File = "avatar-03.jpg"; Url = "https://i1.sndcdn.com/avatars-AW5vOl5gVdybOO6H-ox8FDA-large.jpg" }
  @{ File = "avatar-04.jpg"; Url = "https://i1.sndcdn.com/avatars-kKqVX3TxztZArFEm-xUa2XA-large.jpg" }
  @{ File = "avatar-05.jpg"; Url = "https://i1.sndcdn.com/avatars-BVVEFNfqzxLBOy0r-XAOfDw-large.jpg" }
  @{ File = "avatar-06.jpg"; Url = "https://i1.sndcdn.com/avatars-kdprYEph6MRLhZyz-oAyFyg-large.jpg" }
  @{ File = "avatar-07.jpg"; Url = "https://i1.sndcdn.com/avatars-0lU87Qj2QGkyBplQ-eEV1Fg-large.jpg" }
  @{ File = "avatar-08.jpg"; Url = "https://i1.sndcdn.com/avatars-jgFeMJPl9kxhF7Cd-yuDcxA-large.jpg" }
  @{ File = "avatar-09.jpg"; Url = "https://i1.sndcdn.com/avatars-Xf6B1s2TchilCnYB-apcz1w-large.jpg" }
  @{ File = "avatar-10.jpg"; Url = "https://i1.sndcdn.com/avatars-cZCOlN4TJksUxeWV-9ft3xQ-large.jpg" }
  @{ File = "artwork-01.jpg"; Url = "https://i1.sndcdn.com/artworks-TDryDklmdPCzAeit-zQdIDQ-large.jpg" }
  @{ File = "artwork-02.jpg"; Url = "https://i1.sndcdn.com/artworks-XKfoJlZ8qKVpbJC2-Q5ZBpQ-large.jpg" }
  @{ File = "artwork-03.jpg"; Url = "https://i1.sndcdn.com/artworks-bubbz1AT6hB4-0-large.jpg" }
  @{ File = "artwork-04.jpg"; Url = "https://i1.sndcdn.com/artworks-mMNrxSd5KfDiWlKk-MW1COw-large.jpg" }
  @{ File = "artwork-05.jpg"; Url = "https://i1.sndcdn.com/artworks-8Nz5AulYxzKLCWaK-XNz6tg-large.jpg" }
  @{ File = "artwork-06.jpg"; Url = "https://i1.sndcdn.com/artworks-k1xnMz7SFvTnyDGA-B5riag-large.jpg" }
  @{ File = "artwork-07.jpg"; Url = "https://i1.sndcdn.com/artworks-BRGCCZFMj1ikBHt7-gp7Sug-large.jpg" }
  @{ File = "artwork-08.jpg"; Url = "https://i1.sndcdn.com/artworks-0ly8JkDluhzvXnMi-TqvzxQ-large.jpg" }
  @{ File = "artwork-09.jpg"; Url = "https://i1.sndcdn.com/artworks-OYiDBpoXVWCrz8z7-jIbwLQ-large.jpg" }
  @{ File = "artwork-10.jpg"; Url = "https://i1.sndcdn.com/artworks-EooeJKahuM4ze2OC-h4RAlA-large.jpg" }
)

foreach ($p in $pairs) {
  $out = Join-Path $dest $p.File
  Write-Host "GET $($p.File) ..."
  Invoke-WebRequest -Uri $p.Url -OutFile $out -UseBasicParsing
}

Write-Host "OK -> $dest"
