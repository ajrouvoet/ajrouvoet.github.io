#set page(
     paper: "a4",
     margin: 1cm
)

#set text(
    font: "Noto Sans",
    size: 10pt,
)

#set par(
     justify: true
)

#show heading.where(
      level: 1
): it => it + v(.25cm)

#show heading.where(
      level: 2
): it => block(width: 100%, text(fill: olive, size: 11pt, it.body))

#show link: underline
#show strong: it => text(
    it
)

#grid(
    columns: (30%, 70%-6mm),
    gutter: 6mm,
    [
        #image("defense.jpg")

        I enjoy solving problems with software. I work best in *big problem spaces* with
        many challenges on the road ahead. I like to understand the root problems and to
        *drive innovation* to solve those problems. To make this work, I like to *teach* and
        mentor people, and I like to get involved in the process beyond the technical
        development to align the organisation on a *vision* for the product or service.
        I believe that the organization and *transfer of
        knowledge* is the key challenge in the fast-paced world of software
        engineering.

        It is important for me to work on something that is *relevant to society*. I believe
        that we need to transition to a more sustainable and fair future and I want to
        contribute.

        On a more peronsal level: I'm 32 years old and married to Irene, who is
        an elementary school teacher in the Utrecht area. In my free time, I
        work on minor house renovations, I play chess online, and I enjoy
        bouldering and indoor soccer. I read a lot—both fiction and
        non-fiction—as a source of inspiration and leisure.

        #text(size: 14pt, weight: "semibold")[
            Dr.ir. Arjen Rouvoet
        ]

        See #link("https://ajrouvoet.github.io/#vitae")[ajrouvoet.github.io/\#vitae] for an online version of my
        CV.
    ],
    [
        = Education and Work

        #grid(
            columns: (20%, 80%),
            row-gutter: 4mm,
            [2013–current],
            [
                == Senior Software Engineer at Riscure
                At Riscure, I worked on an innovation project to analyse
                embedded C to identify security vulnerabilities. I helped
                formulate a new technical vision to shape the product offering
                and future development, and I produced the software architecture
                to support the implementation of this vision. I helped the team
                transition from _Java_ to _Kotlin_ as we filled in the design.
            ],
            [2017–2021],
	        [
                == PhD Comp. Sci. in Software Eng. Dept. at TU Delft
                _Cum laude, awarded to top \~3% of CS promovendi in Delft_

                My research at the TU Delft was about using programming languages to
                increase software reliability. In particular, I looked at _formal
                verification_ that software is reliable.
                Unlike testing, this approach can guarantee the absence of certain
                errors and is especially useful for critical software and in domains
                where testing is very difficult.

                My research at the TU Delft is published in multiple papers at top
                international (open-access) journals of computer science. As part of
                the research, I designed and implemented programming languages.
                I also taught and assisted in various MSc courses and
                supervised BSc and MSc students.
            ],
            [2016],
	        [
                == Medior Software Engineer at Science & Technology

                At S&T I developed software to process, archive, and visualize
                atmospheric measurement data. I worked on the entire software stack
                including distributed processing of the data, deployment of the
                software services, and front-end and back-end web-development. I've
                designed and prototyped various innovations in this software stack
                to utilize modern technologies and make the deployment reproducible.
            ],
            [2015],
	        [
                == Paid Softw. Eng. Intern with WalmartLabs
                _San Bruno, California_
            ],
            [2013–2016],
	        [
                == MSc Computer Science at TU Delft

                In my master thesis project I worked on a mathematical formalization
                of implicit resolution in the _Scala_ programming language. The goal
                of such a formalization is to improve our understanding of the
                language to subsequently evolve the language.
            ],
            [2012–2021],
	        [
                == Softw. Eng. at Occator Supply Chain Management

                At Occator, I lead the early development of a product to
                visualize and interact with planning data from production at
                clients such as Friesland Campina, OTG, and Grolsch. Later, I
                designed and prototyped the architectural change that was
                necessary to support their transition to a much more interactive
                planning tool.
            ],
            [2009–2013], [
                == BSc Computer Science at TU Delft
                _Cum laude_
            ],
            [2009–2013], [
                == BSc Electrical Engineering at TU Delft
                _Cum laude_
            ],
        )
    ]
)

#pagebreak()

#columns(2)[
    = Experience

    As a software developer, I am not tied to any particular programming
    language.  I have experience with many mainstream languages (*Java, Kotlin,
    Scala, C\#, Python, Javascript & friends, C, ...*), as well as off-beat ones
    (*OCaml, Haskell, Agda, ...*).

    As a software architect, I like to work from a vision for a product or
    service that is firmly grounded in technical reality, and that encompasses
    the whole user experience. This means that I like to help think about
    marketing and sales aspects so that the positioning of and communication
    around the product align with the technical aspects. At Occator and S&T I
    took ownership of the technical aspects to implement an existing vision, and
    at Riscure I helped develop a new vision in a small team that also
    implemented it.

    I'm an *experienced writer and speaker*, having published and presented
    multiple papers at top scientific conferences of my field.  I enjoy writing
    and presenting and use it to share knowledge in my teams and organisations.
    For example, at Riscure I maintained a blog to document and share the vision
    and architecture that I developed.  At the TU Delft, I taught an MSc course
    on *Software Verification*.

    During my PhD trajactory at the TU Delft I also learned to *design and
    execute research*. I have learned how to make progress and estimate effort
    under uncertainty. I am aware of the state of the art in programming
    language design and tooling, as well as state of the art *techniques for
    producing highly reliable---or even formally verified---software*.

    #colbreak()

    = Publications

    #set list(
        spacing: .5cm
    )


    - *Intrinsically Typed Definitional Interpreters à la Carte*, Cas van der Rest, Casper Bach Poulsen, Arjen Rouvoet, Eelco Visser, Peter D. Mosses,
      Proceedings of the ACM on Program Languages (OOPSLA), 2022

    - #link("https://ajrouvoet.github.io/files/thesis.pdf")[*Correct by Construction Language Implementation*], PhD thesis, 2021

    - #link("https://ajrouvoet.github.io/#/papers/typesafe-compilation")[*Intrinsically Typed Compilation with Nameless Labels*],
      Arjen Rouvoet, Robbert Krebbers and Eelco Visser, in Proceedings of the ACM on Program Languages (POPL), 2021

    - *Knowing when to ask: sound scheduling of name resolution in type checkers derived from declarative specifications*,
      Arjen Rouvoet, Hendrik van Antwerpen, Casper Bach Poulsen, Robbert Krebbers, and Eelco Visser, in Proceedings of the ACM on Program Languages (OOPSLA), 2020

    - *Intrinsically-typed definitional interpreters for linear, session-typed languages*,
      Arjen Rouvoet, Casper Bach Poulsen, Robbert Krebbers, and Eelco Visser, at CPP, 2020

    - *Scope as Types*,
      Hendrik van Antwerpen, Casper Bach Poulsen, Arjen Rouvoet, and Eelco Visser, in Proceedings of the ACM on Program Languages (OOPSLA), 2018

    - *Intrinsically-typed definitional interpreters for imperative languages*
      Casper Bach Poulsen, Arjen Rouvoet, Andrew Tolmach, Robbert Krebbers, and Eelco Visser, in Proceedings of the ACM on Program Languages (POPL), 2018
]
