@extends('layouts.user')

@section('title', 'Albums')

@section('content')
<div class="card">
    <div class="card-header">
        <a href="{{ url('/user/albums/'.$album->id.'/edit') }}" class="btn btn-primary"><i class="fas fa-edit"></i> Edit album</a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{{ $album->id }}</td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>{{ $album->title }}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{{ $album->description }}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection