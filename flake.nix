{
  description = "True Code";

  inputs  = {
    nixpkgs.url = github:NixOS/nixpkgs/nixos-23.05;
  };

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in {
      packages.x86_64-linux = rec {
        aj = pkgs.callPackage ./.nix/aj.nix {};
      };

      defaultPackage.x86_64-linux = self.packages.x86_64-linux.aj;
    };
}
