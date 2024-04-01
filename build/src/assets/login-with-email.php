<?php include 'header.php'; ?>

<!-- page body part start -->
<section class="midBody">
    <article class="container-fluid">
        <article class="row">
            <!-- ad box start -->
            <div class="col-md-1 adBx sticky-top">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->

            <!-- mid part start -->
            <div class="col-md-10">
                <div class="box-form">
                    <div class="left" style="background:url(./assets/images/login-bg.jpg) center bottom;">
                        <div class="overlay">
                            <h1>Success starts here</h1>
                            <ul>
                                <li>Over 600 categories</li>
                                <li>Pay per project, not per hour</li>
                                <li>Access to talent and businesses across the globe</li>
                            </ul>
                        </div>
                    </div>
                    <div class="right">
                        <p class="mb5"><a class="text-muted" href="login.php"><i class="fa fa-long-arrow-left"></i> Back</a></p>
                        <h3>Continue with your email or username</h3>
                        <div class="formBx">
                            <form class="px-md-1 mt30" action="my-account.php">
                                <div class="form-outline mb-3">
                                    <label for=""><b>Email or username</b></label>
                                    <input type="email" class="form-control" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for=""><b>Password</b></label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="row mb-2">
                                    <div class="col-md-6">
                                        <button type="submit" class="btn btnTheme width100 mb-1 mt-0">Continue</button>
                                    </div>
                                    <div class="col-md-6">
                                        <p class="mt-1" align="right"><a class="text14 text-muted" data-bs-toggle="collapse" href="#forgotPassword">Forgot Password</a></p>
                                    </div>
                                </div>
                            </form>
                            <!-- Forgot Password part start -->
                            <div class="input-group collapse" id="forgotPassword">
                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
                                <button class="btn btnTheme" type="button" id="button-addon2">Button</button>
                            </div>
                            <!-- Forgot Password part start -->
                        </div>
                        <p class="text14 text-muted">By joining, you agree to the Dzital Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>
                    </div>
                </div>
            </div>
            <!-- mid part end -->

            <!-- ad box start -->
            <div class="col-md-1 adBx">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->
        </article>
    </article>
</section>
<!-- page body part end -->

<?php include 'footer.php'; ?>