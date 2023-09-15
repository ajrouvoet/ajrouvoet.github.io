{ pkgs, stdenv, lib, nodejs, nodePackages }:

stdenv.mkDerivation rec {
  pname   = "aj";
  version = "latest";
  name    = "${pname}-${version}";

  src = ./.;
  buildInputs = [ nodejs nodePackages.npm ];
}
