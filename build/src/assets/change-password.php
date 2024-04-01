<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Password & Security</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li class="active">Password & Security</li>
                </ul>
            </div>
        </aside>
    </article>
</section>
<!-- page header part end here -->

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

            <!-- sidebar start -->
            <div class="col-md-3">
                <?php include 'my-account-sidebar.php'; ?>
            </div>
            <!-- sidebar end -->

            <!-- right part start -->
            <div class="col-md-7">
                <div class="card border-0">
                    <div class="card card-body border-0">
                        <h2 class="text24 mb5">Password & Security</h2>
                        <p class="text-muted">Manage your password settings and secure your account.</p>
                        <form action="">
                        <div class="row">
                            <div class="col-md-6 mt-2">
                                <label class="mb-1"><b>Current Password</b></label>
                                <input class="form-control" type="password" />
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-6 mt-4">
                                <label class="mb-1"><b>New Password</b></label>
                                <input class="form-control" type="password" />
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="mb-1"><b>Confirm Password</b></label>
                                <input class="form-control" type="password" />
                            </div>
                        </div>
                        <button class="btn btnTheme" type="submit" style="width:fit-content;">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- right part end -->

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