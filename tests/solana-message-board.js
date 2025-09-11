const anchor = require("@coral-xyz/anchor");

describe("solana-message-board", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.solanaMessageBoard;
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Posts a message", async () => {
    const provider = anchor.getProvider();
    const program = anchor.workspace.solanaMessageBoard;
    const author = provider.wallet;

    const messageKeypair = anchor.web3.Keypair.generate();
    const content = "Hello Anchor!";

    const sig = await program.methods
      .postMessage(content)
      .accounts({
        message: messageKeypair.publicKey,
        author: author.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([messageKeypair])
      .rpc();

    console.log("post_message tx:", sig);

    const account = await program.account.messageAccount.fetch(
      messageKeypair.publicKey
    );

    console.log("Fetched message:", account);
    if (account.content !== content) {
      throw new Error("Content mismatch");
    }
    if (!account.author.equals(author.publicKey)) {
      throw new Error("Author mismatch");
    }
  });
});
