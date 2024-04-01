<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Add Post</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li class="active">Add Post</li>
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
                        <h2 class="text24 mb-1">Add Post</h2>
                        <p class="text-muted mb-1">Here you can add your post easily.</p>
                        <hr class="mt0" />

                        <div class="row">
                            <div class="col-md-9 mt-2">
                                <label class="mb-1"><b>Product Title</b></label>
                                <input class="form-control" type="text" />
                            </div>
                            <div class="col-md-3 mt-2">
                                <label class="mb-1"><b>Product Price</b></label>
                                <input class="form-control" type="text" />
                            </div>
                            <div class="col-md-9 mt-2">
                                <label class="mb-1"><b>Product Description</b></label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div class="col-md-3 mt-2">
                                <div class="fileBx">
                                    <input type="file" name="uploadfile" id="img" style="display:none;" />
                                    <label for="img">Click me to upload image</label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btnTheme mt-3" type="submit" style="width:fit-content;"><i class="fa-solid fa-plus"></i> Add Product</button>
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